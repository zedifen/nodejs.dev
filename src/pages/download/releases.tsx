import React from 'react';
import { graphql } from 'gatsby';
import ArticleLayout from '../../layouts/article';
import { DownloadComponents } from '../../components';
import connectGraphQlArticle from '../../connectGraphQlArticle';
import { NodeReleaseData, AboutNavigationKeys } from '../../types';

export interface ReleasesNodeReleases {
  nodeReleases: {
    nodeReleasesData: NodeReleaseData[];
  };
}

export default connectGraphQlArticle(ArticleLayout, {
  editPath: 'content/download/releases.md',
  currentSlug: AboutNavigationKeys.previousReleases,
  hideArticleComponents: true,
  articleContent: (props: ReleasesNodeReleases) => (
    <DownloadComponents.DownloadTable
      nodeReleasesData={props.nodeReleases.nodeReleasesData.filter(
        release => release.status !== 'Pending'
      )}
    />
  ),
});

export const query = graphql`
  query ($locale: String!, $defaultLocale: String!) {
    articleCurrentLanguage: mdx(
      fields: { slug: { eq: "previous-releases" }, locale: { eq: $locale } }
    ) {
      body
      tableOfContents
      frontmatter {
        title
        description
        displayTitle
      }
      fields {
        authors
      }
    }
    articleDefaultLanguage: mdx(
      fields: {
        slug: { eq: "previous-releases" }
        locale: { eq: $defaultLocale }
      }
    ) {
      body
      tableOfContents
      frontmatter {
        title
        description
        displayTitle
      }
      fields {
        authors
      }
    }
    nodeReleases {
      nodeReleasesData {
        fullVersion
        version
        codename
        isLts
        status
        initialRelease
        ltsStart
        maintenanceStart
        endOfLife
      }
    }
  }
`;
