function updateChart() {
    const mass = parseFloat(document.getElementById('mass').value);
    const velocity = parseFloat(document.getElementById('velocity').value);
    const h = 6.626e-34;  // ثابت بلانك (J·s)

    // حساب الطول الموجي باستخدام معادلة دي بليوري
    const wavelength = h / (mass * velocity);

    // إعداد القيم للرسم البياني
    const numWavelengths = 5;  // عدد الأطوال الموجية التي سيتم تمثيلها
    const numPoints = 1000;  // عدد النقاط في الرسم البياني
    const xValues = Array.from({ length: numPoints }, (_, i) => i * (numWavelengths * wavelength / numPoints));  // المسافة (محور x) عبر عدة أطوال موجية
    const yValues = xValues.map(x => Math.sin(2 * Math.PI * x / wavelength));  // الإزاحة عن موضع الاستقرار (محور y)

    // تحديد عرض الخط بناءً على الطول الموجي
    const lineWidth = Math.min(Math.max(wavelength * 1e9, 1), 10);  // تحويل الطول الموجي إلى نانومتر وتحديد نطاق عرض الخط

    // إعداد الرسم البياني
    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        line: { color: '#9c27b0', width: lineWidth },
        hovertemplate: '<b>%{y:.2e} m</b><extra></extra>',  // عرض قيمة الإزاحة فقط عند التمرير
        hoverlabel: { bgcolor: 'rgba(0,0,0,0.7)', font: { color: '#fff' } }
    };

    const layout = {
        title: 'تمثيل موجات دي بلوري',
        xaxis: { title: 'المسافة (m)' },
        yaxis: { title: 'الإزاحة (m)' },
        plot_bgcolor: '#000',
        paper_bgcolor: '#222',
        font: { color: '#fff' },
        shapes: [
            {
                type: 'line',
                x0: 0,
                x1: wavelength,
                y0: -1,
                y1: -1,
                line: {
                    color: 'white',
                    width: 2,
                    dash: 'dot'
                },
                xref: 'x',
                yref: 'y'
            },
            {
                type: 'line',
                x0: 0,
                x1: 0,
                y0: -1,
                y1: 1,
                line: {
                    color: 'blue',
                    width: 2
                },
                xref: 'x',
                yref: 'y'
            },
            {
                type: 'line',
                x0: wavelength,
                x1: wavelength,
                y0: -1,
                y1: 1,
                line: {
                    color: 'blue',
                    width: 2
                },
                xref: 'x',
                yref: 'y'
            }
        ],
        annotations: [
            {
                x: wavelength / 2,
                y: 1.2,
                xref: 'x',
                yref: 'y',
                text: `λ = ${wavelength.toExponential(2)} m`,
                showarrow: false,
                font: {
                    size: 14,
                    color: '#fff'
                },
                align: 'center'
            }
        ],
        hovermode: 'closest',  // لضمان عرض القيم الفردية
    };

    const config = {
        modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d'],
        modeBarButtonsToAdd: ['toImage', 'zoom2d', 'resetScale2d', 'sendDataToCloud'],
        displaylogo: false
    };

    Plotly.newPlot('chart', [trace], layout);
}

// تحديث الرسم البياني عند تحميل الصفحة
window.onload = updateChart;
