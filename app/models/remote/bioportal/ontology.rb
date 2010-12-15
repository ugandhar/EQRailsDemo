require 'open-uri'

module Remote
  module Bioportal
    class Ontology
      class << self
        delegate :offset, :limit, :where, to: :relation

        def relation
          self::Relation.new
        end
      end
      class Relation < Remote::Relation
        def all
          doc =
            open('http://rest.bioontology.org/bioportal/ontologies?email=cgoddard@flmnh.ufl.edu') do |f|
              out = f.read
              parser = XML::Parser.string(out)
              parser.parse
            end

          doc.find('//success/data/list/ontologyBean').inject([]) do |acc, o|
            result =
              { ontology_id:  o.find('ontologyId').try(:first).try(:inner_xml).try(:to_i),
                abbreviation: o.find('abbreviation').try(:first).try(:inner_xml)
              }
            acc << result if where_conditions_met(result)
            acc
          end
        end
        
        def all_hash
          all_ontologies = all
          
          { totalCount: all_ontologies.size,
            ontologies: all_ontologies[@offset, @limit]
          }
        end

        private

        def where_conditions_met result
          @where.all? do |k,v|
            case k.method
            when :in
              v.include?(result.send(k.column))
            else
              fail 'unknown where condition encountered'
            end
          end
        end
      end
    end
  end
end