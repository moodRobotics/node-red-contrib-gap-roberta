'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function RobertaOpenApiNode(config) {
        RED.nodes.createNode(this, config);
        this.method = config.method;
        this.units_token = config.units_token;
        this.units_tokenType = config.units_tokenType || 'str';
        this.sites_token = config.sites_token;
        this.sites_tokenType = config.sites_tokenType || 'str';
        this.devices_token = config.devices_token;
        this.devices_tokenType = config.devices_tokenType || 'str';
        this.devicessite_token = config.devicessite_token;
        this.devicessite_tokenType = config.devicessite_tokenType || 'str';
        this.devicessite_site = config.devicessite_site;
        this.devicessite_siteType = config.devicessite_siteType || 'str';
        this.APImembers_token = config.APImembers_token;
        this.APImembers_tokenType = config.APImembers_tokenType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client;
            if (this.service && this.service.host) {
                client = new lib.RobertaOpenApi({ domain: this.service.host });
            } else {
                node.error('Host in configuration node is not specified.', msg);
                errorFlag = true;
            }
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if (!errorFlag && node.method === 'units') {
                var units_parameters = [];
                var units_nodeParam;
                var units_nodeParamType;

                units_nodeParam = node.units_token;
                units_nodeParamType = node.units_tokenType;
                if (units_nodeParamType === 'str') {
                    units_parameters.token = units_nodeParam || '';
                } else {
                    units_parameters.token = RED.util.getMessageProperty(msg, units_nodeParam);
                }
                units_parameters.token = !!units_parameters.token ? units_parameters.token : msg.payload;
                                result = client.units(units_parameters);
            }
            if (!errorFlag && node.method === 'sites') {
                var sites_parameters = [];
                var sites_nodeParam;
                var sites_nodeParamType;

                sites_nodeParam = node.sites_token;
                sites_nodeParamType = node.sites_tokenType;
                if (sites_nodeParamType === 'str') {
                    sites_parameters.token = sites_nodeParam || '';
                } else {
                    sites_parameters.token = RED.util.getMessageProperty(msg, sites_nodeParam);
                }
                sites_parameters.token = !!sites_parameters.token ? sites_parameters.token : msg.payload;
                                result = client.sites(sites_parameters);
            }
            if (!errorFlag && node.method === 'devices') {
                var devices_parameters = [];
                var devices_nodeParam;
                var devices_nodeParamType;

                devices_nodeParam = node.devices_token;
                devices_nodeParamType = node.devices_tokenType;
                if (devices_nodeParamType === 'str') {
                    devices_parameters.token = devices_nodeParam || '';
                } else {
                    devices_parameters.token = RED.util.getMessageProperty(msg, devices_nodeParam);
                }
                devices_parameters.token = !!devices_parameters.token ? devices_parameters.token : msg.payload;
                                result = client.devices(devices_parameters);
            }
            if (!errorFlag && node.method === 'devicessite') {
                var devicessite_parameters = [];
                var devicessite_nodeParam;
                var devicessite_nodeParamType;

                devicessite_nodeParam = node.devicessite_token;
                devicessite_nodeParamType = node.devicessite_tokenType;
                if (devicessite_nodeParamType === 'str') {
                    devicessite_parameters.token = devicessite_nodeParam || '';
                } else {
                    devicessite_parameters.token = RED.util.getMessageProperty(msg, devicessite_nodeParam);
                }
                devicessite_parameters.token = !!devicessite_parameters.token ? devicessite_parameters.token : msg.payload;
                
                devicessite_nodeParam = node.devicessite_site;
                devicessite_nodeParamType = node.devicessite_siteType;
                if (devicessite_nodeParamType === 'str') {
                    devicessite_parameters.site = devicessite_nodeParam || '';
                } else {
                    devicessite_parameters.site = RED.util.getMessageProperty(msg, devicessite_nodeParam);
                }
                devicessite_parameters.site = !!devicessite_parameters.site ? devicessite_parameters.site : msg.payload;
                                result = client.devicessite(devicessite_parameters);
            }
            if (!errorFlag && node.method === 'APImembers') {
                var APImembers_parameters = [];
                var APImembers_nodeParam;
                var APImembers_nodeParamType;

                APImembers_nodeParam = node.APImembers_token;
                APImembers_nodeParamType = node.APImembers_tokenType;
                if (APImembers_nodeParamType === 'str') {
                    APImembers_parameters.token = APImembers_nodeParam || '';
                } else {
                    APImembers_parameters.token = RED.util.getMessageProperty(msg, APImembers_nodeParam);
                }
                APImembers_parameters.token = !!APImembers_parameters.token ? APImembers_parameters.token : msg.payload;
                                result = client.APImembers(APImembers_parameters);
            }
            if (!errorFlag && result === undefined) {
                node.error('Method is not specified.', msg);
                errorFlag = true;
            }
            var setData = function (msg, data) {
                if (data) {
                    if (data.response) {
                        if (data.response.statusCode) {
                            msg.statusCode = data.response.statusCode;
                        }
                        if (data.response.headers) {
                            msg.headers = data.response.headers;
                        }
                        if (data.response.request && data.response.request.uri && data.response.request.uri.href) {
                            msg.responseUrl = data.response.request.uri.href;
                        }
                    }
                    if (data.body) {
                        msg.payload = data.body;
                    }
                }
                return msg;
            };
            if (!errorFlag) {
                node.status({ fill: 'blue', shape: 'dot', text: 'RobertaOpenApi.status.requesting' });
                result.then(function (data) {
                    node.send(setData(msg, data));
                    node.status({});
                }).catch(function (error) {
                    var message = null;
                    if (error && error.body && error.body.message) {
                        message = error.body.message;
                    }
                    node.error(message, setData(msg, error));
                    node.status({ fill: 'red', shape: 'ring', text: 'node-red:common.status.error' });
                });
            }
        });
    }

    RED.nodes.registerType('gap-roberta', RobertaOpenApiNode);
};
