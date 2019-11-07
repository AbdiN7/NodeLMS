var db = require('./db');

exports.getAllAuthors = function(cb){
    db.query('select * from lms.tbl_author', function(err, result) {
        cb(err, result);
      });
};

exports.addAuthor = function(author, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
      db.query('insert into lms.tbl_author(author_Id, author_Name) values(?,?)', [author.author_Id, author.author_Name], function(err, res){
        if(err){
          db.rollback(function(err, res){
            cb(err, res);
          });
        } 
        db.commit(function(err, res){
          cb(err, res);
        });
      });
    });
};
exports.updateAuthor = function(author, cb)
{
  db.beginTransaction(function(err) {
    if(err) cb(err, null);
    db.query(`UPDATE tbl_author SET author_Name = (?) WHERE author_Id = (?) ;`,[author.author_Name, author.author_Id], function(err, res){
      if(err){
        db.rollback(function(err, res){
          cb(err, res);
        });
      }
      db.commit(function(err, res){
        cb(err, res);
      });
    });
  });
};

exports.removeAuthor = function(authorId, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
      db.query('delete from lms.tbl_author where author_Id = ?', [authorId], function(err, res){
        if(err){
          db.rollback(function(err, res){
            cb(err, res);
          });
        } 
        db.commit(function(err, res){
          cb(err, res);
        });
      });
    });
};
