import { graphql } from '../../codegen';

const subsidiaryCategories = graphql(
  `query subsidiaryCategories($subsidiaryCategoriesInput:!SubsidiaryCategoriesInput)`
);
