var Djin = (
  function()
  {
  
    create = function(databaseName)
    {
      var dbSize = 5*1024*1024; //5MB of default storage
      this.dbPointer = openDatabase(databaseName, "1.0", "some description", dbSize);
      if(!this.dbPointer)
        return false;
      return true;
    }

    return {'create':create};
  }
)(); 
