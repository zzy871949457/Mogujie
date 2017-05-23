var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;

var dbPath = 'mongodb://localhost:27017/loginAndRegister';

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * 注册
 */
router.post('/rg', function (req, res, next) {
    var cName = req.body['cName'];
    var userName = req.body['userName'];
    var pwd = req.body['pwd'];

    /**
     * 插入
     */
    var insertData = function (db, callback) {
        //插入的集合
        var coll = db.collection('message');
        coll.insert([{cName: cName, userName: userName, pwd: pwd}], function (err, result) {
            if (err) {
                console.log('数据插入失败' + err);
            } else {
                console.log('数据插入成功');
                callback(result);
            }

        })
    };

    /**
     * 链接数据库
     */
    mongodb.connect(dbPath, function (err, db) {
        if (err) {
            console.log('数据库连接失败' + err);
        } else {
            console.log('数据库链接成功');
            insertData(db, function (result) {
                console.log(result)
            });
            // res.send('注册成功');
            res.redirect('/login');
            db.close();
        }
    });
});

/**
 * 登陆
 */
router.post('/lg', function (req, res, next) {
    var userName = req.body['userName'];
    var pwd = req.body['pwd'];
    /**
     * 查询
     */
    var findData = function (db, callback) {
        /**
         * 找到集合
         */
        var coll = db.collection('message');
        /**
         * 查询
         */
        coll.find({userName: userName, pwd: pwd}).toArray(function (err, result) {
            if (err) {
                console.log('数据查询失败' + err);
            } else {
                console.log('数据查询成功');
                callback(result);
            }
        })
    };
    /**
     * 链接数据库
     */
    mongodb.connect(dbPath, function (err, db) {
        if (err) {
            console.log('数据库连接失败' + err);
        } else {
            console.log('数据库链接成功');
            findData(db, function (result) {
                if (result.length > 0) {
                    req.session.userName = result[0].cName;
                    res.redirect('/');
                    db.close();
                } else {
                    console.log('账号密码错误');
                    res.redirect('/login');
                    db.close();
                }
            })
        }
    });
});

/**
 * 留言
 */
router.post('/comment', function (req, res, next) {
    var insertData = function (db, callback) {
        var coll = db.collection('history');
        var data = [{content: req.body['content']}];
        coll.insert(data, function (err, result) {
            if (err) {
                console.log('插入数据失败')
            } else {
                callback(result);
            }
        })
    };
    mongodb.connect(dbPath, function (err, db) {
        if (err) {
            console.log('连接数据库失败' + err);
        } else {
            insertData(db, function (result) {
                res.redirect('/users/commentB');
                db.close();
            })
        }
    });
});

/**
 * 留言板
 */
router.get('/commentB', function (req, res, next) {
    var count = 0;
    //查询数据
    var findAllData = function (db, callback) {
        var coll = db.collection('history');
        coll.find({}).toArray(function (err, result) {
            callback(result);
        })
    };
    //连接数据库
    mongodb.connect(dbPath, function (err, db) {
        if (err) {
            console.log('连接失败' + err);
        } else {
            findAllData(db, function (result) {
                res.render('commentB', {title: '留言板', shuju: result,userName:req.session.userName});
                console.log(result);
            });
            db.close();
        }
    });
});

module.exports = router;
