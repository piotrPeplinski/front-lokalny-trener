import { FC } from "react";
import { ContactInfoType } from "../types/ads-types";
import {
  CallIcon,
  CheckIcon,
  HomeIcon,
  MailIcon,
  socialIcons,
} from "../../../assets/icons/icons";
import { socials } from "../utils/utils";

interface ContactInfoProps {
  contactInfo: ContactInfoType;
}

const ContactInfo: FC<ContactInfoProps> = ({ contactInfo }) => {
  return (
    <div className="education-list shadow">
      <h2>Dane kontaktowe</h2>

      <div className="contact-row">
        <MailIcon />
        <p>{contactInfo.email}</p>
      </div>
      {contactInfo.phone && (
        <div className="contact-row">
          <CallIcon />
          <p>{contactInfo.phone}</p>
        </div>
      )}
      {contactInfo.city && (
        <div className="contact-row">
          <HomeIcon />
          <p>{contactInfo.city}</p>
        </div>
      )}
      {contactInfo.remote && (
        <div className="contact-row">
          <CheckIcon />
          <p>Zdalnie</p>
        </div>
      )}
      <div className="socials-row">
        {socials.map((social, index) => {
          const url = contactInfo[social as keyof ContactInfoType];
          if (url) {
            console.log(url);
            const Icon = socialIcons[social];
            return (
              <a href={String(url)} target="blank_" key={index}>
                <Icon />
              </a>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
