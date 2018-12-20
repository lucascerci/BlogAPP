# BlogAPP

     A table of all 7 RESTful routes

     ===============================================================================================    
     |  Name       Path            HTTP Verb     Purpose                                           | Mongoose Method
     ===============================================================================================
     |  INDEX     /dogs            GET	         Display a list of all dogs                        | Dog.find()
     |  NEW       /dogs/new        GET	         Displays form to make a new dog                   | N/A
     |  CREATE    /dogs            POST          Create a new dog, then redirect somewhere         | Dog.create()
     |  SHOW      /dogs/:id        GET           Shows info about one dog                          | Dog.findById()
     |  EDIT      /dogs/:id/edit   GET           Show edit form for one dog                        | Dog.findById()	
     |  UPDATE    /dogs/:id        PUT           Update a particular dog, then redirect somewhere  | Dog.findByIdAndUpdate()
     ===============================================================================================
