import React, { useEffect, useState } from 'react'
import Promise from 'promise-polyfill'
import { loadResource } from '../../../../../utils/front/resources'

import styles from './styles.module.css'

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    docsearch?: (opts: object) => void
  }
}

const SearchForm: React.FC = props => {
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      loadResource(
        'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css'
      ),
      loadResource(
        'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js'
      )
    ]).then(() => setLoaded(true))
  }, [])

  useEffect(() => {
    if (isLoaded) {
      window.docsearch &&
        window.docsearch({
          apiKey: '0f39a68ab6f073f9c4d5858e4f6e9b5d',
          indexName: 'cml',
          inputSelector: '#doc-search',
          debug: false // Set to `true` if you want to inspect the dropdown
        })
    }
  }, [isLoaded])

  if (!isLoaded) {
    return null
  }

  return (
    <div className={styles.searchArea}>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          id="doc-search"
          placeholder="Search docs"
          {...props}
        />
      </div>
    </div>
  )
}

export default SearchForm
