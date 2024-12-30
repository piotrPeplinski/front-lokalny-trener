import { FC } from "react";
import { ContactInfoType } from "../types/ads-types";
import { CallIcon, MailIcon, socialIcons } from "../../../assets/icons/icons";
import { socials } from "../utils/utils";

interface ContactInfoProps {
  contactInfo: ContactInfoType | undefined;
}

const ContactInfo: FC<ContactInfoProps> = ({ contactInfo }) => {
  return (
    <div className="education-list shadow">
      <h2>Dane kontaktowe</h2>

      <div className="contact-row">
        <MailIcon />
        <p>{contactInfo?.email}</p>
      </div>
      {contactInfo?.phone && (
        <div className="contact-row">
          <CallIcon />
          <p>{contactInfo?.phone}</p>
        </div>
      )}
      <div className="socials-row mt-2">
        {socials.map((social) => {
          const Icon = socialIcons[social];
          if (contactInfo) {
            const url = contactInfo[social as keyof ContactInfoType];
            if (url) {
              return (
                <a href={url} target="blank_">
                  <Icon />
                </a>
              );
            }
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
