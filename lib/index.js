const _ = require('lodash')
const Core = require('@alicloud/pop-core')

module.exports = {
  provider: 'aliyun-dm',
  name: 'Aliyun DM',
  auth: {
    aliyun_dm_access_key_id: {
      label: 'accessKeyId',
      type: 'text',
    },
    aliyun_dm_access_key_secret: {
      label: 'accessKeySecret',
      type: 'text',
    },
    aliyun_dm_endpoint: {
      label: 'endpoint',
      type: 'text',
    },
    aliyun_dm_api_version: {
      label: 'apiVersion',
      type: 'text',
    },
    aliyun_dm_account_name: {
      label: 'AccountName',
      type: 'text',
    },
    aliyun_dm_address_type: {
      label: 'AddressType',
      type: 'enum',
      values: [0, 1],
    },
    aliyun_dm_from_alias: {
      label: 'FromAlias',
      type: 'text',
    },
    aliyun_dm_reply_to_address: {
      label: 'ReplyToAddress',
      type: 'enum',
      values: ['true', 'false'],
    },
    aliyun_dm_click_trace: {
      label: 'ClickTrace',
      type: 'enum',
      values: [0, 1],
    },
    aliyun_dm_tag_name: {
      label: 'TagName',
      type: 'text',
    },
    aliyun_dm_debug: {
      label: 'debug',
      type: 'enum',
      values: ['on', 'off'],
    },
    aliyun_dm_mock: {
      label: 'mock',
      type: 'enum',
      values: ['off', 'on'],
    },
  },
  init: conf => {
    const client = new Core({
      accessKeyId: conf.aliyun_dm_access_key_id,
      accessKeySecret: conf.aliyun_dm_access_key_secret,
      endpoint: conf.aliyun_dm_endpoint,
      apiVersion: conf.aliyun_dm_api_version,
    })

    return {
      async send(opt = {}) {
        const params = {
          FromAlias: conf.aliyun_dm_from_alias,
          ToAddress: _.isArray(opt.to) ? _.join(opt.to, ',') : opt.to,
          Subject: opt.subject,
          ...(opt.text && {
            TextBody: opt.text,
          }),
          ...(opt.html && {
            HtmlBody: opt.html,
          }),
          AccountName: conf.aliyun_dm_account_name,
          AddressType: Number(conf.aliyun_dm_address_type),
          ReplyToAddress: conf.aliyun_dm_reply_to_address === 'true',
          ClickTrace: String(conf.aliyun_dm_click_trace),
          TagName: conf.aliyun_dm_tag_name,
        }
        if (conf.aliyun_dm_debug === 'on') {
          strapi.log.debug('email-aliyun-dm', 'params', JSON.stringify(params, null, 2))
        }
        if (conf.aliyun_dm_mock !== 'on') {
          try {
            const res = await client.request('SingleSendMail', params, {
              method: 'POST',
            })
            if (conf.aliyun_dm_debug === 'on') {
              strapi.log.debug('email-aliyun-dm', 'res', JSON.stringify(res, null, 2))
            }
          } catch (e) {
            strapi.log.error('email-aliyun-dm', 'e', e)
          }
        }
      },
    }
  },
}
