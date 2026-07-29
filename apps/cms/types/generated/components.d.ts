import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleCarousel extends Struct.ComponentSchema {
  collectionName: 'components_article_carousels';
  info: {
    displayName: '\u65B0\u95FB\u56FE\u7247\u8F6E\u64AD';
  };
  attributes: {
    images: Schema.Attribute.Component<'shared.media-item', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface ArticleImage extends Struct.ComponentSchema {
  collectionName: 'components_article_images';
  info: {
    displayName: '\u65B0\u95FB\u56FE\u7247';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    caption: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sourcePath: Schema.Attribute.String &
      Schema.Attribute.CustomField<'global::legacy-path'>;
  };
}

export interface ArticleParagraph extends Struct.ComponentSchema {
  collectionName: 'components_article_paragraphs';
  info: {
    displayName: '\u65B0\u95FB\u6BB5\u843D';
  };
  attributes: {
    bold: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ArticleQuote extends Struct.ComponentSchema {
  collectionName: 'components_article_quotes';
  info: {
    displayName: '\u65B0\u95FB\u5F15\u7528';
  };
  attributes: {
    author: Schema.Attribute.String;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ArticleSectionTitle extends Struct.ComponentSchema {
  collectionName: 'components_article_section_titles';
  info: {
    displayName: '\u65B0\u95FB\u5C0F\u8282\u6807\u9898';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContactInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_contact_info_cards';
  info: {
    displayName: '\u8054\u7CFB\u65B9\u5F0F\u5361\u7247';
  };
  attributes: {
    iconKey: Schema.Attribute.Enumeration<
      ['phone', 'address', 'email', 'time']
    > &
      Schema.Attribute.DefaultTo<'phone'>;
    items: Schema.Attribute.Component<'contact.info-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContactInfoItem extends Struct.ComponentSchema {
  collectionName: 'components_contact_info_items';
  info: {
    displayName: '\u8054\u7CFB\u4FE1\u606F\u9879';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.Text & Schema.Attribute.Required;
    valueType: Schema.Attribute.Enumeration<['text', 'phone', 'email']> &
      Schema.Attribute.DefaultTo<'text'>;
  };
}

export interface ContactJob extends Struct.ComponentSchema {
  collectionName: 'components_contact_jobs';
  info: {
    displayName: '\u62DB\u8058\u5C97\u4F4D';
  };
  attributes: {
    department: Schema.Attribute.String & Schema.Attribute.Required;
    employmentType: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u5168\u804C'>;
    headcount: Schema.Attribute.String;
    legacyKey: Schema.Attribute.String & Schema.Attribute.Required;
    location: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    requirements: Schema.Attribute.Blocks;
    responsibilities: Schema.Attribute.Blocks;
    salary: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u9762\u8BAE'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    visible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContactOffice extends Struct.ComponentSchema {
  collectionName: 'components_contact_offices';
  info: {
    displayName: '\u516C\u53F8\u57FA\u5730';
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    latitude: Schema.Attribute.Decimal & Schema.Attribute.Required;
    longitude: Schema.Attribute.Decimal & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContactPanel extends Struct.ComponentSchema {
  collectionName: 'components_contact_panels';
  info: {
    displayName: '\u8868\u5355\u54C1\u724C\u9762\u677F';
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    items: Schema.Attribute.Component<'contact.info-item', true>;
    tagline: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ContactTalentValue extends Struct.ComponentSchema {
  collectionName: 'components_contact_talent_values';
  info: {
    displayName: '\u4EBA\u624D\u7406\u5FF5\u5361\u7247';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    iconKey: Schema.Attribute.Enumeration<
      ['people', 'learning', 'collaboration']
    > &
      Schema.Attribute.DefaultTo<'people'>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentCaseList extends Struct.ComponentSchema {
  collectionName: 'components_content_case_lists';
  info: {
    displayName: '\u6848\u4F8B\u5217\u8868';
  };
  attributes: {
    caseKeys: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'global::structured-json',
        {
          editorMode: 'string-list';
        }
      >;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    layoutVariant: Schema.Attribute.Enumeration<
      ['cards', 'chapters', 'carousel']
    > &
      Schema.Attribute.DefaultTo<'cards'>;
    title: Schema.Attribute.String;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContentCta extends Struct.ComponentSchema {
  collectionName: 'components_content_ctas';
  info: {
    displayName: '\u884C\u52A8\u53F7\u53EC';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    targetPath: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['default', 'contact', 'inquiry', 'callout']
    > &
      Schema.Attribute.DefaultTo<'default'>;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContentDataTable extends Struct.ComponentSchema {
  collectionName: 'components_content_data_tables';
  info: {
    displayName: '\u6570\u636E\u8868';
  };
  attributes: {
    datasetKey: Schema.Attribute.String & Schema.Attribute.Required;
    datasetView: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'global::structured-json',
        {
          editorMode: 'dataset-view';
        }
      >;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    layoutVariant: Schema.Attribute.Enumeration<
      ['default', 'scroll', 'compact', 'grouped']
    > &
      Schema.Attribute.DefaultTo<'scroll'>;
    title: Schema.Attribute.String;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContentEquipmentGrid extends Struct.ComponentSchema {
  collectionName: 'components_content_equipment_grids';
  info: {
    displayName: '\u6838\u5FC3\u8BBE\u5907';
  };
  attributes: {
    equipmentKeys: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'global::structured-json',
        {
          editorMode: 'string-list';
        }
      >;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    layoutVariant: Schema.Attribute.Enumeration<
      ['cards', 'horizontal', 'detailed']
    > &
      Schema.Attribute.DefaultTo<'cards'>;
    title: Schema.Attribute.String;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContentFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_content_feature_grids';
  info: {
    displayName: '\u7279\u70B9\u7F51\u683C';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    eyebrow: Schema.Attribute.String;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'shared.feature-item', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    layoutVariant: Schema.Attribute.Enumeration<
      ['cards', 'icons', 'numbered', 'compact']
    > &
      Schema.Attribute.DefaultTo<'cards'>;
    title: Schema.Attribute.String;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContentMediaGallery extends Struct.ComponentSchema {
  collectionName: 'components_content_media_galleries';
  info: {
    displayName: '\u5A92\u4F53\u753B\u5ECA';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'shared.media-item', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    layoutVariant: Schema.Attribute.Enumeration<
      ['grid', 'slider', 'three-column', 'stacked']
    > &
      Schema.Attribute.DefaultTo<'grid'>;
    title: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['gallery', 'three-view', 'carousel', 'case']
    > &
      Schema.Attribute.DefaultTo<'gallery'>;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContentMediaText extends Struct.ComponentSchema {
  collectionName: 'components_content_media_texts';
  info: {
    displayName: '\u56FE\u6587\u4ECB\u7ECD';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    body: Schema.Attribute.Blocks;
    eyebrow: Schema.Attribute.String;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    layoutVariant: Schema.Attribute.Enumeration<
      ['media-left', 'media-right', 'media-top']
    > &
      Schema.Attribute.DefaultTo<'media-right'>;
    mediaItems: Schema.Attribute.Component<'shared.media-item', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    theme: Schema.Attribute.Enumeration<['light', 'dark', 'muted']> &
      Schema.Attribute.DefaultTo<'light'>;
    title: Schema.Attribute.String;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContentRichText extends Struct.ComponentSchema {
  collectionName: 'components_content_rich_texts';
  info: {
    description: '\u4FDD\u5B58\u539F\u9875\u9762\u8FC1\u5165\u7684\u6BB5\u843D\u6587\u6848\uFF1B\u5DF2\u62C6\u6210\u4E13\u7528\u5B57\u6BB5\u7684\u5185\u5BB9\u4F18\u5148\u7F16\u8F91\u4E13\u7528\u5B57\u6BB5';
    displayName: '\u9875\u9762\u6B63\u6587\uFF08\u8FC1\u79FB\u6587\u6848\uFF09';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    body: Schema.Attribute.Blocks;
    eyebrow: Schema.Attribute.String;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    layoutVariant: Schema.Attribute.Enumeration<['default', 'narrow', 'wide']> &
      Schema.Attribute.DefaultTo<'default'>;
    theme: Schema.Attribute.Enumeration<['light', 'dark', 'muted']> &
      Schema.Attribute.DefaultTo<'light'>;
    title: Schema.Attribute.String;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface ContentVideo extends Struct.ComponentSchema {
  collectionName: 'components_content_videos';
  info: {
    displayName: '\u89C6\u9891';
  };
  attributes: {
    captions: Schema.Attribute.Media<'files'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Schema.Attribute.Text;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    poster: Schema.Attribute.Component<'shared.media-item', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String;
    video: Schema.Attribute.Component<'shared.media-item', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface SharedEvidenceItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_evidence_items';
  info: {
    displayName: '\u8BC1\u636E\u9879';
  };
  attributes: {
    datasetKey: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    kind: Schema.Attribute.Enumeration<
      [
        'single-image',
        'double-image',
        'metric-chart',
        'data-table',
        'text',
        'sem-eds',
      ]
    > &
      Schema.Attribute.Required;
    layoutVariant: Schema.Attribute.Enumeration<
      ['default', 'stacked', 'side-by-side', 'wide']
    > &
      Schema.Attribute.DefaultTo<'default'>;
    mediaItems: Schema.Attribute.Component<'shared.media-item', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    span: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    title: Schema.Attribute.String;
  };
}

export interface SharedFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_items';
  info: {
    displayName: '\u529F\u80FD\u7279\u70B9';
  };
  attributes: {
    bullets: Schema.Attribute.Component<'shared.text-item', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: Schema.Attribute.Text;
    iconKey: Schema.Attribute.Enumeration<
      [
        'development',
        'target',
        'connect',
        'leaf',
        'energy',
        'process',
        'quality',
        'performance',
        'filter',
        'like',
        'laptop',
        'speed',
      ]
    >;
    iconMedia: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    order: Schema.Attribute.Integer &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMediaItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_media_items';
  info: {
    displayName: '\u5A92\u4F53\u9879';
  };
  attributes: {
    alt: Schema.Attribute.String;
    aspectVariant: Schema.Attribute.Enumeration<
      ['auto', 'square', 'landscape', 'portrait', 'wide']
    > &
      Schema.Attribute.DefaultTo<'auto'>;
    caption: Schema.Attribute.Text;
    imageFit: Schema.Attribute.Enumeration<['contain', 'cover']> &
      Schema.Attribute.DefaultTo<'cover'>;
    imagePosition: Schema.Attribute.Enumeration<
      ['center', 'top', 'bottom', 'left', 'right']
    > &
      Schema.Attribute.DefaultTo<'center'>;
    label: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'videos' | 'files'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    role: Schema.Attribute.Enumeration<
      [
        'cover',
        'hero',
        'three-view',
        'gallery',
        'case',
        'diagram',
        'chart',
        'video',
        'other',
      ]
    > &
      Schema.Attribute.DefaultTo<'other'>;
    sourcePath: Schema.Attribute.String &
      Schema.Attribute.CustomField<'global::legacy-path'>;
  };
}

export interface SharedPageHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_page_heroes';
  info: {
    displayName: '\u9875\u9762\u9996\u5C4F';
  };
  attributes: {
    desktopMedia: Schema.Attribute.Media<'images' | 'videos' | 'files'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    imagePosition: Schema.Attribute.Enumeration<
      ['center', 'top', 'bottom', 'left', 'right']
    > &
      Schema.Attribute.DefaultTo<'center'>;
    mediaType: Schema.Attribute.Enumeration<['image', 'video']> &
      Schema.Attribute.DefaultTo<'image'>;
    mobileMedia: Schema.Attribute.Media<'images' | 'videos' | 'files'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    overlay: Schema.Attribute.Enumeration<['none', 'light', 'dark']> &
      Schema.Attribute.DefaultTo<'dark'>;
    showScrollIndicator: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    subtitle: Schema.Attribute.Text;
    titleOverride: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    canonicalOverride: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedTextItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_items';
  info: {
    displayName: '\u6587\u672C\u9879';
  };
  attributes: {
    label: Schema.Attribute.String;
    order: Schema.Attribute.Integer &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SpecialRenderer extends Struct.ComponentSchema {
  collectionName: 'components_special_renderers';
  info: {
    displayName: '\u53D7\u63A7\u7279\u6B8A\u6E32\u67D3\u5668';
  };
  attributes: {
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    payload: Schema.Attribute.JSON & Schema.Attribute.Required;
    rendererKey: Schema.Attribute.Enumeration<
      ['pipeline-material-validation-v1', 'twin-screw-validation-v1']
    > &
      Schema.Attribute.Required;
    schemaVersion: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface TechnicalChartGallery extends Struct.ComponentSchema {
  collectionName: 'components_technical_chart_galleries';
  info: {
    displayName: '\u6280\u672F\u56FE\u8868\u753B\u5ECA';
  };
  attributes: {
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'shared.media-item', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface TechnicalEvidenceGrid extends Struct.ComponentSchema {
  collectionName: 'components_technical_evidence_grids';
  info: {
    displayName: '\u6280\u672F\u8BC1\u636E\u7F51\u683C';
  };
  attributes: {
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'shared.evidence-item', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface TechnicalMetricChart extends Struct.ComponentSchema {
  collectionName: 'components_technical_metric_charts';
  info: {
    displayName: '\u6307\u6807\u56FE\u8868';
  };
  attributes: {
    datasetKey: Schema.Attribute.String & Schema.Attribute.Required;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    layoutVariant: Schema.Attribute.Enumeration<
      ['line', 'bar', 'scatter', 'multi-axis']
    > &
      Schema.Attribute.DefaultTo<'line'>;
    title: Schema.Attribute.String;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface TechnicalReportSection extends Struct.ComponentSchema {
  collectionName: 'components_technical_report_sections';
  info: {
    displayName: '\u6280\u672F\u62A5\u544A\u7AE0\u8282';
  };
  attributes: {
    background: Schema.Attribute.Blocks;
    conclusion: Schema.Attribute.Blocks;
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    process: Schema.Attribute.Blocks;
    result: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface TechnicalSimulationGallery extends Struct.ComponentSchema {
  collectionName: 'components_technical_simulation_galleries';
  info: {
    displayName: '\u4EFF\u771F\u7ED3\u679C';
  };
  attributes: {
    internalName: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'shared.media-item', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    visible: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Schema.Attribute.DefaultTo<true>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'article.carousel': ArticleCarousel;
      'article.image': ArticleImage;
      'article.paragraph': ArticleParagraph;
      'article.quote': ArticleQuote;
      'article.section-title': ArticleSectionTitle;
      'contact.info-card': ContactInfoCard;
      'contact.info-item': ContactInfoItem;
      'contact.job': ContactJob;
      'contact.office': ContactOffice;
      'contact.panel': ContactPanel;
      'contact.talent-value': ContactTalentValue;
      'content.case-list': ContentCaseList;
      'content.cta': ContentCta;
      'content.data-table': ContentDataTable;
      'content.equipment-grid': ContentEquipmentGrid;
      'content.feature-grid': ContentFeatureGrid;
      'content.media-gallery': ContentMediaGallery;
      'content.media-text': ContentMediaText;
      'content.rich-text': ContentRichText;
      'content.video': ContentVideo;
      'shared.evidence-item': SharedEvidenceItem;
      'shared.feature-item': SharedFeatureItem;
      'shared.media-item': SharedMediaItem;
      'shared.page-hero': SharedPageHero;
      'shared.seo': SharedSeo;
      'shared.text-item': SharedTextItem;
      'special.renderer': SpecialRenderer;
      'technical.chart-gallery': TechnicalChartGallery;
      'technical.evidence-grid': TechnicalEvidenceGrid;
      'technical.metric-chart': TechnicalMetricChart;
      'technical.report-section': TechnicalReportSection;
      'technical.simulation-gallery': TechnicalSimulationGallery;
    }
  }
}
