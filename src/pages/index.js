import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Home() {
    return <BrowserOnly fallback={<div>Loading...</div>}>
    {() => {
      window.location = "https://the-starport.com";
    }}
  </BrowserOnly>
}