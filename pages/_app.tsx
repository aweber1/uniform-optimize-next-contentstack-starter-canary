import { UniformTracker } from '@uniformdev/optimize-tracker-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import '../styles/style.css';

// for locally downloaded intent data and tracker from npm
import { localTracker } from '../lib/local-tracker';
import MainHero from '../components/Hero';
import CallToAction from '../components/CallToAction';
import { PersonalizedHero } from '../components/PersonalizedHero';
import { ComponentMapping } from '../lib/ComponentMapping';
import TalkList from '../components/TalkList';
import { RegisterForm } from '../components/RegisterForm';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { Tracker } from '@uniformdev/optimize-tracker-common';
import { WhyAttend } from '../components/WhyAttend';
import { IntentVector } from '@uniformdev/optimize-common';

const componentMapping: ComponentMapping = {
  hero: MainHero,
  call_to_action: CallToAction,
  personalized_hero: PersonalizedHero,
  talks_list: TalkList,
  registration_form: RegisterForm,
  why_attend: WhyAttend,
};

export type UniformConfAppProps = AppProps & {
  tracker?: Tracker;
  scoring?: IntentVector;
};

export default function UniformConfApp({ Component, pageProps, tracker, scoring }: UniformConfAppProps) {
  const trackerInstance = tracker || localTracker;

  return (
    <UniformTracker
      trackerInstance={trackerInstance}
      componentMapping={componentMapping}
      isServer={typeof window === 'undefined'}
      initialIntentScores={scoring}
    >
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </UniformTracker>
  );
}
