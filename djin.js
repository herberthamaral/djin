var DjinErrors ={}; //improve this.
var Djin = (
  function()
  {
    
    var dbName = '';
    create = function(databaseName)
    {
      var dbSize = 5*1024*1024; //5MB of default storage
      this.dbPointer = openDatabase(databaseName, "1.0", "some description", dbSize);
      dbName = databaseName;
      if(!this.dbPointer)
        return false;
      return true;
    }

    createTable = function(tableName,params) {
      if(!this.dbPointer)
        throw 'Can\'t access database object';
      
      this.dbPointer.transaction(function(t){
        var fields = [];

        for (p in params)
        {
          if(params[p]=='pk') //shortcut for primary key
            fields.push(p+' INTEGER PRIMARY KEY');
          else
            fields.push(p+' '+params[p]);
        }
        t.executeSql('CREATE TABLE IF NOT EXISTS '+tableName+'('+fields.join(',')+')',[],null,
          function(e){ DjinErrors['createTable']='Unable to create a table'; }); 
      });
      var isValid = DjinErrors['createTable']==null;
      //Store database metadata in localStorage for later usage. Unable to get database metadata directly from it right now.
      var keyName = dbName+'MetaData_table_'+tableName;
      var value = serialize(params);
      localStorage.setItem(keyName,value);
      return isValid;
    }

    add = function(tableName,value)
    {
      if(!this.dbPointer)
        throw 'Can\'t access database object';
      
      this.dbPointer.transaction(function(t){
        var fields = [];
        var values = [];
        var nvalues = [];
        for (i in value)
        {
          fields.push(i);
          values.push(value[i]);
          nvalues.push('?')
        }
        t.executeSql('INSERT INTO '+tableName+'('+fields.join(',')+') VALUES('+nvalues.join(',')+')',values,null,
            function(e){ DjinErrors['insert']='Unable to insert item:'+e} );
      });

      return DjinErrors['insert']==null;
    }

    return {'create':create,'createTable':createTable,'add':add};

  }
)(); 
