import { useUniformTracker } from '@uniformdev/optimize-tracker-react';
import Head from 'next/head';
import { PageFields, TalkFields, Entry } from '../lib/contentstack';
import { createElement } from 'react';
import { TalksContext } from '../components/TalksContext';

export interface PageProps {
  slug: string;
  page: PageFields;
  talks: Entry<TalkFields>[];
}

export function Home({ page, talks }: PageProps) {
  const { componentMapping } = useUniformTracker();

  return (
    <TalksContext.Provider value={talks}>
      <Head>
        <title>{page?.title} | UniformConf</title>
      </Head>
      {page?.components &&
        page.components.map((component, index) =>
          createElement(componentMapping[component._content_type_uid] ?? (() => null), {
            key: index,
            ...component,
          })
        )}
    </TalksContext.Provider>
  );
}
