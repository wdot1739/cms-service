// All available block component names
export type PuckBlockType =
  | 'HeroBlock'
  | 'FeaturesBlock'
  | 'TestimonialsBlock'
  | 'PricingBlock'
  | 'CTABlock'
  | 'TextBlock'
  | 'ImageBlock'
  | 'QuoteBlock'
  | 'DividerBlock'
  | 'ColumnsBlock'
  | 'CodeBlock'
  | 'HowItWorksBlock';

// Puck stores page data as { content: ComponentData[], root: {} }
export interface PuckPageData {
  content: Array<{
    type: PuckBlockType;
    props: Record<string, unknown>;
  }>;
  root: {
    props?: {
      title?: string;
      description?: string;
    };
  };
  zones?: Record<string, Array<{
    type: PuckBlockType;
    props: Record<string, unknown>;
  }>>;
}
