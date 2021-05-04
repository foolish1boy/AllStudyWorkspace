

import { createI18n } from 'vue-i18n';
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn';
import zhLocale from './zh'

const messages = {
    zh: {
      ...zhLocale,
      ...elementZhLocale
    }
  }

const i18n = createI18n({locale:'zh',messages:messages});

export default i18n;