import * as React from 'react';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { useOpenshiftVersion } from '@console/shared/src/hooks/version';
import { useK8sWatchResource } from '@console/internal/components/utils/k8s-watch-hook';
import { K8sResourceKind, referenceForModel } from '@console/internal/module/k8s';
import { ConsoleLinkModel } from '@console/internal/models';
import { useTranslation } from 'react-i18next';

const DevPerspectiveTourText: React.FC = () => {
  const { t } = useTranslation();
  const openshiftVersion = useOpenshiftVersion();
  return (
    <>
      {t(
        'devconsole~Get started with a tour of some of the key areas in OpenShift {{version}} Developer perspective that can help you complete workflows and be more productive.',
        { version: openshiftVersion ? [openshiftVersion?.slice(0, 3), "'s"].join('') : '4.x' },
      )}
    </>
  );
};

export const devPerspectiveTourText = <DevPerspectiveTourText />;

export const perspectiveSwitcherTourText = (
  <>
    <p>Switch between the Developer and Administrator perspectives.</p>
    <p>
      Use the Administrator perspective to manage workload storage, networking, cluster settings,
      and more. This may require additional user access.
    </p>
    <p>
      Use the Developer perspective to build applications and associated components and services,
      define how they work together, and monitor their health over time.
    </p>
  </>
);

export const searchTourText = (
  <>
    <p>
      Search for resources in your project by simply starting to type or scrolling through a list of
      existing resources.
    </p>
    <p>
      Add frequently accessed resources to your side navigation for quick access. Look for the{' '}
      <span style={{ color: 'var(--pf-global--palette--blue-400)' }}>
        <PlusCircleIcon /> Add to navigation
      </span>{' '}
      link next to your search result.
    </p>
  </>
);

const FinishTourText: React.FC = () => {
  const [consoleLinks] = useK8sWatchResource<K8sResourceKind[]>({
    isList: true,
    kind: referenceForModel(ConsoleLinkModel),
    optional: true,
  });
  const openshiftBlogLink = consoleLinks.filter(
    (link: K8sResourceKind) => link.metadata.name === 'openshift-blog',
  )[0]?.spec?.href;
  // declaring openshiftHelpBase instead of importing because it throws error while using it as tour extension
  const openshiftHelpBase =
    window.SERVER_FLAGS.documentationBaseURL || 'https://docs.okd.io/latest/';
  return (
    <>
      Stay up-to-date with everything OpenShift on our{' '}
      <a href={openshiftBlogLink} target="_blank" rel="noopener noreferrer">
        blog
      </a>{' '}
      or continue to learn more in our{' '}
      <a href={openshiftHelpBase} target="_blank" rel="noopener noreferrer">
        documentation
      </a>
      .
    </>
  );
};

export const finishTourText = <FinishTourText />;
