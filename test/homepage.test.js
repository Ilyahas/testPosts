const expect = require('chai').expect;
const app = require('../app');
const request = require('request');

const config = require('../config');

const host = config.host + ":" + config.PORT;

describe('App', function () {
    it("check home page", function (done) {
       request.get({url: host + "/"}, function (err, res, body){
           expect(res.statusCode).to.equal(200);
           done();
       });
    });

    it("check home page", function (done) {
        request.get({url: host + "/posts/page/1"}, function (err, res, body){
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it("check posts on page 1", function (done) {
        request.get({url: host + "/posts/page/1"}, function (err, res, body){
            expect(res.statusCode).to.equal(200);
            console.log("[posts on page]:" , body);
            done();
        });
    });

    it("signin", function (done) {
        request.post({
            url: host + "/auth/signin",
            headers: {'content-type' : 'application/json'},
            form: {
                username: "user1",
                password: "qwerty123"
            }
        }, function (err, res, body){
            expect(res.statusCode).to.equal(200);
            console.log("[signin]:" , body);
            done();
        });
    });

    it("addPost", function (done) {
        request.post({
            url: host + "/auth/signin",
            headers: {'content-type' : 'application/json'},
            form: {
                username: "user1",
                password: "qwerty123"
            }
        }, function (err, res, body){
            expect(res.statusCode).to.equal(200);
            console.log("[signin]:", JSON.parse(body).token);
            const token = JSON.parse(body).token;
            request.post({
                url: host + "/posts/",
                headers: {'content-type' : 'application/json', 'authorization': 'Bearer: ' + token},
                form: {
                    body: "content",
                }
            }, function (err, res, body){
                expect(res.statusCode).to.equal(200);
                console.log("[addPost]:" , body);
                done();
            });
        });
    });

});