var utils = {
  _lengthTip: function (number, type = 'string') {
    if (type === 'number') {
      return '数值必须小于或等于' + number
    } else {
      return '长度必须少于或等于' + number + '个字符'
    }
  },
  getFromRules: function (max = 200, required = true, type = 'string') {
    return [
      {
        type: type,
        max: max,
        message: this._lengthTip(max, type)
      },
      this.getFromRulesRequired(required, type)
    ]
  },
  getFromRulesRequired: function (required = true, type = 'any') {
    return {
      type: type,
      required: required,
      message: '必须填写',
      transform(value) {
        if (!this.type || this.type === 'string' || this.type === 'number') {
          if (value === null || value === undefined || value === 'null' || value === 'undefined') {
            return ''
          }
        } else if (this.type === 'array') {
          if (!value && value.length === 0) {
            return null
          }
        }
        return value
      }
    }
  }
}
export default utils
