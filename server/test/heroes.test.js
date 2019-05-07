'use strict';

import app from '../server';
import chai from 'chai';
import request from 'supertest';

var expect = chai.expect;

describe('API Tests', function() { 
  var hero = { 
    name: 'test hero' 
  };
  describe('# Get all heroes', function() { 
    it('should get all heroes', function(done) { 
      request(app).get('/heroes').end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body).to.be.an('array'); 
        expect(res.body).to.be.empty; 
        done(); 
      }); 
    }); 
  }); 

  describe('# Create hero ', function() { 
    it('should create a hero', function(done) { 
      request(app).post('/heroes').send(hero).end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body.name).to.equal(hero.name); 
        hero = res.body; 
        done(); 
      }); 
    }); 
  }); 

  describe('# Get a hero by id', function() { 
    it('should get a hero', function(done) { 
      request(app) .get('/heroes/' + hero._id) .end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body.name).to.equal(hero.name); 
        done(); 
      }); 
    }); 
  });

  describe('# Update a hero by id', function() {
    it('should modify a hero', function(done) {
      hero.name = 'test hero updated'
      request(app)
        .put('/heroes/' + hero._id)
        .send(hero)
        .end(function(err, res) {
          expect(res.body.name).to.equal('test hero updated');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('# Delete a hero by id', function() {
    it('should delete a hero', function(done) {
      request(app)
        .delete('/heroes/' + hero._id)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.equal('Removed successfully');
          done();
        });
    });
  });
});