const _ = require('lodash')
const Core = require('@alicloud/pop-core')

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    return {
      send: (options = {}) => {
        return new Promise((resolve, reject) => {
          const logger = strapi.logger ? strapi.logger('email:aliyun:send') : strapi.log
          const client = new Core({ ...providerOptions, ...settings, ...options })
          const params = { ...settings, ...options }
          const debug = strapi.logger ? true : params.debug
          const { to: ToAddress, subject, Subject, text, html, TextBody, HtmlBody } = params
          const req = {
            ToAddress: _.isArray(ToAddress) ? _.join(ToAddress, ',') : ToAddress,
            Subject: Subject || subject,
            HtmlBody: HtmlBody || html,
            TextBody: TextBody || text,
            ...params,
          }
          let res
          client
            .request('SingleSendMail', req, {
              method: 'POST',
            })
            .then(result => {
              res = result
              if (debug) {
                logger.debug({ req, res }, 'email aliyun')
              }
              resolve()
            })
            .catch(e => {
              logger.error(e, { req, res }, 'email aliyun')
              // eslint-disable-next-line prefer-promise-reject-errors
              reject([{ messages: [{ id: `${e.name}: ${e.message}` }] }])
            })
        })
      },
    }
  },
}
