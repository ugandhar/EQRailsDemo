class State < ActiveRecord::Base
  self.table_name = :chr_states
  self.primary_key = :id

  select_scope :label, {
    select: [ :name ]
  }
  def label
    name
  end
end