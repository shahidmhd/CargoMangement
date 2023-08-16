import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PdfDocument = ({ data }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.title}>Report</Text>
            {data.map((row, index) => (
                <View key={index} style={styles.row}>
                    <Text>{row.No}</Text>
                    <Text>{row.InvoiceNo}</Text>
                    <Text>{row.InvoiceDate}</Text>
                    <Text>{row.BoxNo}</Text>
                    <Text>{row.Airwaybill}</Text>
                    {/* Render other columns */}
                </View>
            ))}
        </Page>
    </Document>
);

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    // Add more styles as needed
});

export default PdfDocument;
