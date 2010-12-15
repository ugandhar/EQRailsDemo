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
            Nokogiri::XML(
              open(
                'http://rest.bioontology.org/bioportal/ontologies?email=cgoddard@flmnh.ufl.edu'
              )
            )
          doc.xpath('//success/data/list/ontologyBean').inject([]) do |acc, o|
            result =
              { ontology_id:  o.xpath('ontologyId').try(:first).try(:content).try(:to_i),
                abbreviation: o.xpath('abbreviation').try(:first).try(:content)
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