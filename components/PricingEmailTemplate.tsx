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

interface PricingEmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const PricingEmailTemplate: React.FC<PricingEmailTemplateProps> = ({
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
    <Preview>🔥 HOT LEAD: {name} is interested in your website service!</Preview>
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
          border: '3px solid #10b981', // Green border for leads
        }}
      >
        <Heading
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#059669',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          🔥 HOT LEAD ALERT! 🔥
        </Heading>
        
        <Text
          style={{
            fontSize: '18px',
            color: '#047857',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '24px',
            backgroundColor: '#d1fae5',
            padding: '16px',
            borderRadius: '8px',
            border: '2px solid #10b981',
          }}
        >
          💰 POTENTIAL CLIENT - WEBSITE SERVICE INQUIRY
        </Text>
        
        <Hr style={{ margin: '24px 0', borderColor: '#10b981' }} />
        
        <Row>
          <Text
            style={{
              fontSize: '16px',
              color: '#374151',
              fontWeight: '600',
              marginBottom: '8px',
            }}
          >
            👤 Client Name:
          </Text>
          <Text
            style={{
              fontSize: '18px',
              color: '#1f2937',
              fontWeight: '600',
              marginBottom: '16px',
              backgroundColor: '#ecfdf5',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #10b981',
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
            📧 Contact Email:
          </Text>
          <Text
            style={{
              fontSize: '18px',
              color: '#1f2937',
              fontWeight: '600',
              marginBottom: '16px',
              backgroundColor: '#ecfdf5',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #10b981',
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
            📍 Lead Source:
          </Text>
          <Text
            style={{
              fontSize: '16px',
              color: '#047857',
              fontWeight: '700',
              marginBottom: '16px',
              backgroundColor: '#d1fae5',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #10b981',
            }}
          >
            🎯 PRICING SECTION - Website Service Interest
          </Text>
        </Row>
        
        {message && message.trim() && (
          <Row>
            <Text
              style={{
                fontSize: '16px',
                color: '#374151',
                fontWeight: '600',
                marginBottom: '8px',
              }}
            >
              💬 Additional Message:
            </Text>
            <Text
              style={{
                fontSize: '16px',
                color: '#1f2937',
                lineHeight: '1.6',
                backgroundColor: '#ecfdf5',
                padding: '16px',
                borderRadius: '8px',
                border: '2px solid #10b981',
                whiteSpace: 'pre-wrap',
              }}
            >
              {message}
            </Text>
          </Row>
        )}
        
        <Hr style={{ margin: '32px 0', borderColor: '#10b981' }} />
        
        <Section
          style={{
            backgroundColor: '#fef3c7',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #f59e0b',
            marginBottom: '24px',
          }}
        >
          <Heading
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#92400e',
              marginBottom: '12px',
              textAlign: 'center',
            }}
          >
            🚀 NEXT STEPS
          </Heading>
          <Text
            style={{
              fontSize: '14px',
              color: '#92400e',
              lineHeight: '1.5',
              margin: '0',
            }}
          >
            • This lead came from your pricing section - they're interested in your website service<br/>
            • They've already seen your pitch deck and sales copy<br/>
            • Priority: HIGH - Respond within 24 hours for best conversion<br/>
            • Suggested follow-up: Schedule a discovery call to discuss their needs
          </Text>
        </Section>
        
        <Text
          style={{
            fontSize: '14px',
            color: '#059669',
            textAlign: 'center',
            fontWeight: '600',
          }}
        >
          💰 This is a qualified lead from your pitch deck landing page!
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
        Powered by Resend & Next.js | Lead Management System
      </Text>
    </Container>
  </Html>
);

export default PricingEmailTemplate;
