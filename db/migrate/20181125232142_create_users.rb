class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.text :username
      t.string :password_digest
      t.text :email

      t.timestamps
    end
  end
end
