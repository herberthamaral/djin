allDjinTests = function()
{
  //var djin = new Djin();

  test("Initialize an empty Database",
      function(){
        ok(Djin.create("myDataBase"),"Create a new database with 5MB of storage (default)");

      });
  test("Try to create a table in current database",
    function(){
      
    })
}
