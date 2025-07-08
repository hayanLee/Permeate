import CustomerServiceInfo from './CustomerServiceInfo';
import SNSInfo from './SNSInfo';

const ContactSection = () => {
  return (
    <div className="grid grid-cols-2">
      <CustomerServiceInfo />
      <SNSInfo />
    </div>
  );
};

export default ContactSection;
