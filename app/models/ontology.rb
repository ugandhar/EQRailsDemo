class Ontology
  class << self
    delegate :offset, :limit, :all, to: :relation

    def relation
      self::Relation.new
    end

    def create! *args
      self::Include.create!(*args)
    end
  end

  class Include < ActiveRecord::Base
    self.table_name = 'ontologies'
    self.primary_key = 'ontology_id'
  end

  class Relation < Remote::Relation
    delegate :all, :all_hash, to: :self_with_remote

    private

    def self_with_remote
      bioportal_ontology_ids = Ontology::Include.all.collect(&:bioportal_ontology_id)
      remote_rel = Remote::Bioportal::Ontology.where(:ontology_id.in => bioportal_ontology_ids)
      remote_rel = remote_rel.offset(@offset) if @offset
      remote_rel = remote_rel.limit(@limit) if @limit
      remote_rel
    end
  end  
end