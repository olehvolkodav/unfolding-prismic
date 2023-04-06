import React from "react";
import { Section } from "components/atoms/Section";
import styled, { css } from "styled-components";

const donateScript = `
<iframe id="donationFormIframe" scrolling="no" loading="lazy" style="border:none; width:100%;" src="https://unfoldingword.secure.force.com/donate/DonationPageCart?id=7014T000000gffYQAQ"></iframe><div id="staffFooterDiv" onclick="handleFooterClick()" style="display:none; position:fixed; bottom:0; width:100%; background-color:#31ADE3;"><p style="color:#FFFFFF; font-family:'Montserrat'; text-align:center;">View Staff</p></div><div id="checkoutFooterDiv" onclick="handleFooterClick()" style="display:none; position:fixed; bottom:0; width:100%; background-color:#31ADE3;"><p style="color:#FFFFFF; font-family:'Montserrat'; text-align:center;">Continue to Checkout</p></div><script type="text/javascript">var iframe_resize = function (event) {if (event.origin !== "https://www.unfoldingword.org" && !event.origin.includes("local:8000") && !event.origin.includes("force.com")) {return;}if(event.data.height) {var donation_iframe = document.getElementById('donationFormIframe');if (donation_iframe) {donation_iframe.style.height = event.data.height + "px";}}else if(event.data.footer) {if(event.data.footer.viewStaff) {var projects_footer_div = document.getElementById('staffFooterDiv');if (projects_footer_div) {projects_footer_div.style.display = event.data.footer.viewStaff.display;}}if(event.data.footer.viewCheckout) {var checkout_footer_div = document.getElementById('checkoutFooterDiv');if (checkout_footer_div) {checkout_footer_div.style.display = event.data.footer.viewCheckout.display;}}}else if(event.data.redirect) {window.location.href = event.data.redirect;}};if (window.addEventListener) {window.addEventListener("message", iframe_resize, false);} else if (window.attachEvent) {window.attachEvent("onmessage", iframe_resize);}</script><script type="text/javascript">function handleFooterClick() {var donation_iframe = document.getElementById('donationFormIframe');if(donation_iframe) {var messageJson = {method: 'handleFooterButtonPress'};donation_iframe.contentWindow.postMessage(messageJson, '*');}}</script>`;

const Donationembed = ({ slice }) => {
  return (
    <Section bgColor={slice.primary.background_color} wrapperCss={wrapperCss({isMobileHide: slice.primary.hide_on_mobile})}>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: donateScript }} />
      </Content>
    </Section>
  );
};

export default Donationembed;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  & > div {
    width: 100%;
  }
`;

const wrapperCss = ({isMobileHide}) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "flex"};
  }
  @media (min-width: 1025px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;
