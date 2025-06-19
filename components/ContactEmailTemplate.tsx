import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Container,
  Hr,
} from '@react-email/components';

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmailTemplate: React.FC<ContactEmailTemplateProps> = ({
  name,
  email,
  message,
}) => (
  <Html>
    <Head>
      <Font
        fontFamily="Inter"
        fallbackFontFamily="Helvetica"
        webFont={{
          url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>New contact form submission from {name}</Preview>
    <Container
      style={{
        backgroundColor: '#f8fafc',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '20px',
      }}
    >
      <Section
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <Heading
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          📩 New Contact Form Submission
        </Heading>
        
        <Hr style={{ margin: '24px 0', borderColor: '#e2e8f0' }} />
        
        <Row>
          <Text
            style={{
              fontSize: '16px',
              color: '#374151',
              fontWeight: '600',
              marginBottom: '8px',
            }}
          >
            👤 From:
          </Text>
          <Text
            style={{
              fontSize: '16px',
              color: '#1f2937',
              marginBottom: '16px',
              backgroundColor: '#f1f5f9',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
            }}
          >
            {name}
          </Text>
        </Row>
        
        <Row>
          <Text
            style={{
              fontSize: '16px',
              color: '#374151',
              fontWeight: '600',
              marginBottom: '8px',
            }}
          >
            📧 Email:
          </Text>
          <Text
            style={{
              fontSize: '16px',
              color: '#1f2937',
              marginBottom: '16px',
              backgroundColor: '#f1f5f9',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
            }}
          >
            {email}
          </Text>
        </Row>
        
        <Row>
          <Text
            style={{
              fontSize: '16px',
              color: '#374151',
              fontWeight: '600',
              marginBottom: '8px',
            }}
          >
            💬 Message:
          </Text>
          <Text
            style={{
              fontSize: '16px',
              color: '#1f2937',
              lineHeight: '1.6',
              backgroundColor: '#f1f5f9',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              whiteSpace: 'pre-wrap',
            }}
          >
            {message}
          </Text>
        </Row>
        
        <Hr style={{ margin: '32px 0', borderColor: '#e2e8f0' }} />
        
        <Text
          style={{
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          This email was sent from your website's contact form
        </Text>
      </Section>
      
      <Text
        style={{
          fontSize: '12px',
          color: '#9ca3af',
          textAlign: 'center',
          marginTop: '16px',
        }}
      >
        Powered by Resend & Next.js
      </Text>
    </Container>
  </Html>
);

export default ContactEmailTemplate;
