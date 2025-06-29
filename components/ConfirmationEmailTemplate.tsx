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

interface ConfirmationEmailTemplateProps {
  userName: string;
}

export const ConfirmationEmailTemplate: React.FC<ConfirmationEmailTemplateProps> = ({
  userName,
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
    <Preview>Thank You for Your Purchase!</Preview>
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
          🎉 Thank You For Your Order, {userName}!
        </Heading>

        <Text
          style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.6',
            marginBottom: '24px',
            textAlign: 'left',
          }}
        >
          We&apos;ve successfully received your project request. We&apos;re excited to get started!
        </Text>

        <Text
          style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.6',
            marginBottom: '24px',
            textAlign: 'left',
          }}
        >
          Your new website and brand assets will be delivered within <strong>4 business days</strong>.
          If we need any clarification on your project details or requests, we will reach out to you shortly.
        </Text>

        <Text
          style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.6',
            marginBottom: '24px',
            textAlign: 'left',
          }}
        >
          In the meantime, if you have any urgent questions, feel free to reply to this email or contact us through the website.
        </Text>

        <Hr style={{ margin: '32px 0', borderColor: '#e2e8f0' }} />

        <Text
          style={{
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          {/* Removed: "This is an automated confirmation email." */}
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
        Vorve | Your Partner in Digital Excellence
      </Text>
    </Container>
  </Html>
);

export default ConfirmationEmailTemplate;
