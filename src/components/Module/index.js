import React from "react";

import CoverModule from "../../modules/Cover"
import CallToActionModule from "../../modules/CallToAction"
import Affiliates from "../../modules/Affiliates"
import TeamMembers from "../../modules/TeamMembers"
import FeatureGrid from "../../modules/FeatureGrid"
import FeatureList from "../../modules/FeatureList"
import Locations from "../../modules/Locations"
import Content from "../../modules/Content"
import News from "../../modules/News"
import LandingPage from "../../modules/LandingPage";
import Cards from "../../modules/Cards";

export default class Module extends React.Component {

  renderModule(type, attributes) {
    const moduleCallbacks = {
      ContentfulModuleCover: attributes => <CoverModule {...attributes} />,
      ContentfulModuleAffiliates: attributes => <Affiliates {...attributes} />,
      ContentfulModuleTeamMembers: attributes => <TeamMembers {...attributes} />,
      ContentfulModuleFeatureGrid: attributes => <FeatureGrid {...attributes} />,
      ContentfulModuleFeatureList: attributes => <FeatureList {...attributes} />,
      ContentfulModuleCallToAction: attributes => <CallToActionModule {...attributes} />,
      ContentfulModuleLocations: attributes => <Locations {...attributes} />,
      ContentfulModuleContent: attributes => <Content {...attributes} />,
      ContentfulModuleNews: attributes => <News {...attributes} />,
      ContentfulModuleLandingPage: attributes => <LandingPage {...attributes} />,
      ContentfulModuleCards: attributes => <Cards {...attributes} />,
    }

    // prevent app from crashing when module is not defined
    if (moduleCallbacks[type] !== undefined) {
      return moduleCallbacks[type](attributes);
    }

    return null;
  }

  render() {
    const { attributes, type } = this.props;
    return (this.renderModule(type, attributes));
  }
}