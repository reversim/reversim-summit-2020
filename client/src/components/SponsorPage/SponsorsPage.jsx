/*global cloudinary */

import React from "react";
import s from "../Sponsors.css";
import { Container } from "reactstrap";
import Page from "../Page";
import cn from "classnames";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

import SponsorForm from './SponsorForm';
import PremiumSponsors from './PremiumSponsors';
import CommunitySponsors from './CommunitySponsors';

library.add(faPencilAlt, faTrash);

// const COLLAPSED_MAX_CHARS = 110;

const WantToBe = () => (
  <div className="my-4 line-height-17 text-center text-white font-size-lg d-flex justify-content-center">
    <div>
      <div className="font-size-xl">Want to be a sponsor?</div> {"Contact our amazing Gilli at "}
      <a className="text-white" href="mailto:gilli@reversim.com">
        gilli@reversim.com
      </a>
      {" and let's have fun together!"}
    </div>
  </div>
);

class SponsorsPage extends React.Component {
  render() {
    const {
      createSponsor,
      updateSponsor,
      deleteSponsor,
      user,
      sponsors
    } = this.props;

    return (
      <Page title="Sponsors" {...this.props}>
        <div
          className={cn(
            s.premiumCover,
            "bg-purple2 page-hero pb-8 navbar-margin d-flex justify-content-center align-items-center"
          )}
        >
          <Container>
            {user && user.isReversimTeamMember && (
              <div className="border p-3 mb-8">
                <h3>Add sponsor</h3>
                <SponsorForm onSubmit={createSponsor} />
              </div>
            )}
            <WantToBe />
            <PremiumSponsors
              sponsors={sponsors.filter(sponsor => sponsor.isPremium)}
              user={user}
              updateSponsor={updateSponsor}
              deleteSponsor={deleteSponsor}
            />
          </Container>
        </div>
        <Container className="mt-4">
          <CommunitySponsors
            sponsors={sponsors.filter(sponsor => !sponsor.isPremium)}
            user={user}
            updateSponsor={updateSponsor}
            deleteSponsor={deleteSponsor}
          />
          {/*<h3 className="text-center">The annual Reversim conference is here</h3>*/}
          {/*<h3 className="font-weight-bold  text-center">and we can't do it without you!</h3>*/}
        </Container>
      </Page>
    );
  }
}

export default SponsorsPage;


// class Sponsor extends React.Component {
//   constructor(props) {
//     super(props);
//     let {
//       sponsor: { about }
//     } = this.props;
//     const isTooLong = about.length > COLLAPSED_MAX_CHARS;
//   }

//   render() {
//     let {
//       sponsor: { name = "", logo, url, about = "", jobUrl },
//       onEdit,
//       onDelete
//     } = this.props;

//     const featuredJob = `Interested? More info [here](${jobUrl}).`;

//     return (
//       <div className="about__team-member mb-12 d-flex" style={{height: "auto"}}>
//         <a href={hyperlink(url)} target="_blank">
//           <div
//             style={{ backgroundImage: `url('${image(logo, 240, 240)}')` }}
//             alt={name}
//             className={img}
//           />
//         </a>
//         <div className="flex-grow-1 line-height-12">
//           <div className="p-4 bg-white b-strong p-relative overflow-hidden">
//             <div ref={this.ref}>
//               <h4 className="line-height-1 mb-1">
//                 {name}
//                 {onEdit && (
//                   <span>
//                     <Button
//                       size="sm"
//                       color="primary"
//                       className="ml-2"
//                       onClick={onEdit}
//                     >
//                       <FontAwesomeIcon icon={faPencilAlt} />
//                     </Button>
//                     <Button
//                       size="sm"
//                       color="danger"
//                       className="ml-2"
//                       onClick={onDelete}
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </Button>
//                   </span>
//                 )}
//               </h4>
//               <p className="line-height-15 mb-0">{about}</p>
//               {jobUrl && (
//                 <div>
//                   <br />
//                   <h5>Featured job</h5>
//                   <ReactMarkdown source={featuredJob} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// NOTE: Sponsor component is not in use but I didn't want to delet it yet