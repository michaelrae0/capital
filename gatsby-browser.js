/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faComment } from '@fortawesome/free-regular-svg-icons';
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faCircle,
  faComment,
  faChevronUp,
  faEnvelope,
  faGithub,
  faLinkedin,
  faTwitter,
);

