'use strict';

import app from '../server';
import chai from 'chai';
import request from 'supertest';

var expect = chai.expect;

describe('API Tests', function() { 
  var hero = { 
    name: 'test hero' 
  };
  const apiURL = '/api/heroes';

  describe('# Get all heroes', function() { 
    it('should get all heroes', function(done) { 
      request(app).get(apiURL).end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body).to.be.an('array'); 
        expect(res.body).to.be.empty; 
        done(); 
      }); 
    }); 
  }); 

  describe('# Create hero ', function() { 
    it('should create a hero', function(done) { 
      request(app).post(apiURL).send(hero).end(function(err, res) { 
        expect(res.statusCode).to.equal(200); 
        expect(res.body.name).to.equal(hero.name); 
        hero = res.body; 
        done(); 
      }); 
    }); 
  }); 

  describe('# Get a hero by id', function() { 
    it('should get a hero', function(done) { 
      request(app) .get(`${apiURL}/${hero._id}`).end(function(err, res) { 
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
        .put(`${apiURL}/${hero._id}`)
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
        .delete(`${apiURL}/${hero._id}`)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.equal('Removed successfully');
          done();
        });
    });
  });
});