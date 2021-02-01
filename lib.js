/*jshint -W069 */
/**
 * 
 * @class RobertaOpenApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var RobertaOpenApi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function RobertaOpenApi(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name RobertaOpenApi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    RobertaOpenApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if(Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${ fileType(form[keyName]).ext }` : `file` )
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };


/**
 * Devuelve todos las unidades operativas de un negocio
 * @method
 * @name RobertaOpenApi#units
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.token - Token de seguridad
 */
 RobertaOpenApi.prototype.units = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/units';
    var body = {}, queryParameters = {}, headers = {}, form = {};


        
            path = path.replace('{TOKEN}', parameters['token']);
        
        


        if(parameters['token'] === undefined){
            deferred.reject(new Error('Missing required  parameter: token'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Devuelve todos las unidades operativas de un negocio
 * @method
 * @name RobertaOpenApi#sites
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.token - Token de seguridad
 */
 RobertaOpenApi.prototype.sites = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/sites';
    var body = {}, queryParameters = {}, headers = {}, form = {};


        
            path = path.replace('{TOKEN}', parameters['token']);
        
        


        if(parameters['token'] === undefined){
            deferred.reject(new Error('Missing required  parameter: token'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Devuelve todos los dispositivos de un site
 * @method
 * @name RobertaOpenApi#devices
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.token - Token de seguridad
 */
 RobertaOpenApi.prototype.devices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devices';
    var body = {}, queryParameters = {}, headers = {}, form = {};


        
            path = path.replace('{TOKEN}', parameters['token']);
        
        


        if(parameters['token'] === undefined){
            deferred.reject(new Error('Missing required  parameter: token'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Devuelve todos los dispositivos de un site
 * @method
 * @name RobertaOpenApi#devicessite
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.token - Token de seguridad
     * @param {string} parameters.site - Site del que queremos obtener la lista de dispositivos
 */
 RobertaOpenApi.prototype.devicessite = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/devicessite';
    var body = {}, queryParameters = {}, headers = {}, form = {};


        
            path = path.replace('{TOKEN}', parameters['token']);
        
        


        if(parameters['token'] === undefined){
            deferred.reject(new Error('Missing required  parameter: token'));
            return deferred.promise;
        }
 
        
            path = path.replace('{site}', parameters['site']);
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Devuelve todos los miembros de un site
 * @method
 * @name RobertaOpenApi#APImembers
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.token - Token de seguridad
 */
 RobertaOpenApi.prototype.APImembers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/members';
    var body = {}, queryParameters = {}, headers = {}, form = {};


        
            path = path.replace('{TOKEN}', parameters['token']);
        
        


        if(parameters['token'] === undefined){
            deferred.reject(new Error('Missing required  parameter: token'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return RobertaOpenApi;
})();

exports.RobertaOpenApi = RobertaOpenApi;
