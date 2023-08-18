import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PdfDocument = ({ data }) => {
    console.log(data,"datas");
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Invoice Report</Text>
        {data.map((invoice, index) => (
          <View key={index} style={styles.invoice}>
            <Text>Invoice Number: {invoice.invoiceNumber}</Text>
            <Text>Invoice Date: {invoice.selectedDate}</Text>
            <Text>Company Name: {invoice.selectedCompanyId.companyname}</Text>
            <Text>Airway Bill: {invoice.airwayBillNo}</Text>
            <Text>Box Number: {invoice.boxNo}</Text>
            {/* Render other invoice details */}
            {invoice.tableRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                <Text>Service Name: {row.serviceName}</Text>
                <Text>HSN Code: {row.HSNCode}</Text>
                <Text>Weight: {row.weight}</Text>
                <Text>Amount: {row.amount}</Text>
                {/* Add more row details if needed */}
              </View>
            ))}
            <Text>Subtotal: {invoice.subtotal}</Text>
            <Text>Total Weight: {invoice.totalWeight}</Text>
            <Text>IGST: {invoice.gst18}</Text>
            <Text>CGST: {invoice.CGST}</Text>
            <Text>SGST: {invoice.SGST}</Text>
            <Text>Total Amount: {invoice.totalAmount}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  invoice: {
    marginBottom: 10,
    padding: 10,
    border: '1 solid #ccc',
  },
});

export default PdfDocument;
