# strapi-provider-email-aliyun-dm

## Config

`./config/plugins.js`

change fields marked `// change`

```javascript
export default ({ env }) => ({
  email: {
    provider: 'aliyun-dm',
    providerOptions: {
      accessKeyId: '', // change
      accessKeySecret: '', // change
      endpoint: 'https://dm.aliyuncs.com',
      apiVersion: '2015-11-23',
    },
    settings: {
      FromAlias: '', // change
      AccountName: '', // change
      AddressType: 1,
      ReplyToAddress: true,
      ClickTrace: '1',
      TagName: '',
      debug: true, // change
    },
  },
})
```

## Resources

- [Aliyun Doc](https://help.aliyun.com/document_detail/29444.html)

- [MIT License](LICENSE.md)
