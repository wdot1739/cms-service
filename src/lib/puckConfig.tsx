import type { Config } from '@measured/puck';
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { FeaturesBlock } from '@/components/blocks/FeaturesBlock';
import { HowItWorksBlock } from '@/components/blocks/HowItWorksBlock';
import { TestimonialsBlock } from '@/components/blocks/TestimonialsBlock';
import { PricingBlock } from '@/components/blocks/PricingBlock';
import { CTABlock } from '@/components/blocks/CTABlock';
import {
  TextBlock, HeadingBlock, ImageBlock,
  QuoteBlock, DividerBlock, CodeBlock,
} from '@/components/blocks/ContentBlocks';

export const puckConfig: Config = {
  components: {
    HeroBlock,
    FeaturesBlock,
    HowItWorksBlock,
    TestimonialsBlock,
    PricingBlock,
    CTABlock,
    TextBlock,
    HeadingBlock,
    ImageBlock,
    QuoteBlock,
    DividerBlock,
    CodeBlock,
  },
};

export default puckConfig;
