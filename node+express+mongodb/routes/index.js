var express = require('express');
var router = express.Router();

/**
 * 首页
 */
router.get('/', function (req, res, next) {
    res.render('index', {title: '首页', userName: req.session.userName});
});

/**
 * 注册
 */
router.get('/register', function (req, res, next) {
    res.render('register', {title: '注册'});
});

/**
 * 登录
 */
router.get('/login', function (req, res, next) {
    res.render('login', {title: '登录'});
});

/**
 * 留言
 */
router.get('/comment', function (req, res, next) {
    res.render('comment', {title: '留言'});
});

module.exports = router;
