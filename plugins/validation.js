export default ({app}, inject) => {
  let i18n = app.i18n

  inject('required', validation => {
    let data = []
    if (validation.required) {
      data.push({
        required: true,
        message: i18n.t('form.required'),
        trigger: 'blur'
      })
    }
    if (validation.type) {
      data.push({
        type: validation.type ?? 'string',
        min: validation.min ?? 6,
        message: i18n.t('form.min.string', {min: validation.min ?? 6}),
        trigger: validation.trigger ?? 'blur'
      })
    }
    return data
  })
}
