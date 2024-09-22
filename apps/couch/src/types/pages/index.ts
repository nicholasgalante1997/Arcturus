export interface PageConfig<P = {} & JSX.IntrinsicAttributes> {
  /**
   * the name of the production js bundle,
   * this is injected into the output html document
   */
  bundle: string;
  /**
   * the page level component that is to be rendered at compile time,
   * and injected into the html template
   */
  component: React.FC<any> | (() => JSX.Element);
  /**
   * The content for the head <title> tag
   */
  title: string;
  /**
   * The content for the head <meta name="description" /> tag
   */
  description: string;
  /**
   * any props that need to be fetched at build time and passed to the page
   */
  props?: P;
  /**
   * the name of the output html file
   */
  htmlFileName: string;
  /**
   * the name of any stylesheets that need to be included,
   * this allows us not to have to fetch all the css and just load whats needed
   * on a page by page basis
   */
  styles: string[];
}
