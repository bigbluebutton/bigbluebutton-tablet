import i18next from 'i18next'
import RNLanguages from 'react-native-languages';
import resources from './resources';

export const initTranslation = ()=>{     
    i18next.init({
        compatibilityJSON: 'v3',
        lng: RNLanguages.language,
        resources: resources
    })
} 