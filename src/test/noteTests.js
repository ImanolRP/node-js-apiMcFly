"use strict"

var assert = require('assert');
var request = require('supertest')
var app = require('../app.js')

var request = request("http://localhost:8090")

describe('List of functions for the class Note.', function() {
    describe('GET', function(){
        it('Should return 200 status and a json as default data format', (done) => {
            request.get('/api/note')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('Should return 200 status and a json as data format when set an id header to application/json', (done) => {
            request.get('/api/note/1')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
        it('Should return 200 status and a json list of notes with favorite field to true', (done) => {
            request.get('/api/favorite')
                .expect((res) => {
                    if (res.favorite !== true) return "Error: Some Note isn't favorite."; 
                })
                .expect(200, done);
        });
    });
    describe('PUT', function(){
        it('Should return 200 status code and mark the note favorite field as true', (done) => {
        request.put('/api/favorite/1')
            .expect(200, done);
        });
    });
    describe('POST', function(){
        it('Should return 201 status code', (done) => {
        const note = {text: "lorem ipsum"}
        request.post('/api/newNote')
            .send(note)
            .expect(201, done);
        });
    });
 });