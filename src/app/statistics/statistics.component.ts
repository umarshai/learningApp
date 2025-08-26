import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  // Chart.js pie chart data and options
  categoryChartData: any = { datasets: [{ data: [] }] };
  categoryChartLabels: string[] = [];
  tagChartData: any = { datasets: [{ data: [] }] };
  tagChartLabels: string[] = [];
  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#fafafa' }
      }
    }
  };
  chartPalette = [
    '#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#17a2b8', '#fd7e14', '#20c997', '#6610f2', '#e83e8c'
  ];

  ngOnChanges() {
    this.updateCharts();
  }

  ngOnInit() {
    this.updateCharts();
  }

  updateCharts() {
    // Filtered expenses for charting
    let filtered = this.expenses;
    if (this.filterTag)
      filtered = filtered.filter(e => Array.isArray(e.tags) && e.tags.includes(this.filterTag));
    if (this.filterCategory)
      filtered = filtered.filter(e => e.category === this.filterCategory);
    // Date filtering (reuse logic from expense component)
    if (this.filterDateType && this.filterDateType !== 'all') {
      const now = new Date();
      let start: Date, end: Date;
      if (this.filterDateType === 'daily') {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = new Date(start); end.setDate(end.getDate() + 1);
        filtered = filtered.filter(e => {
          const d = new Date(e.date);
          return d >= start && d < end;
        });
      } else if (this.filterDateType === 'single' && this.filterSingleDate) {
        start = new Date(this.filterSingleDate);
        end = new Date(start); end.setDate(end.getDate() + 1);
        filtered = filtered.filter(e => {
          const d = new Date(e.date);
          return d >= start && d < end;
        });
      } else if (this.filterDateType === 'weekly') {
        start = new Date(now);
        start.setDate(now.getDate() - now.getDay());
        end = new Date(start); end.setDate(end.getDate() + 7);
        filtered = filtered.filter(e => {
          const d = new Date(e.date);
          return d >= start && d < end;
        });
      } else if (this.filterDateType === 'monthly') {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        filtered = filtered.filter(e => {
          const d = new Date(e.date);
          return d >= start && d < end;
        });
      } else if (this.filterDateType === 'custom' && this.filterCustomStart && this.filterCustomEnd) {
        start = new Date(this.filterCustomStart);
        end = new Date(this.filterCustomEnd);
        end.setDate(end.getDate() + 1);
        filtered = filtered.filter(e => {
          const d = new Date(e.date);
          return d >= start && d < end;
        });
      }
    }
    // Pie chart for categories
    const catMap: {[cat: string]: number} = {};
    filtered.forEach(e => {
      if (e.category) catMap[e.category] = (catMap[e.category] || 0) + Number(e.amount);
    });
    this.categoryChartLabels = Object.keys(catMap);
    this.categoryChartData = {
      datasets: [{
        data: Object.values(catMap),
        backgroundColor: this.chartPalette.slice(0, Object.keys(catMap).length)
      }]
    };
    // Pie chart for tags (sum by tag)
    const tagMap: {[tag: string]: number} = {};
    filtered.forEach(e => {
      if (Array.isArray(e.tags)) {
        e.tags.forEach((tag: string) => {
          tagMap[tag] = (tagMap[tag] || 0) + Number(e.amount);
        });
      }
    });
    this.tagChartLabels = Object.keys(tagMap);
    this.tagChartData = {
      datasets: [{
        data: Object.values(tagMap),
        backgroundColor: this.chartPalette.slice(0, Object.keys(tagMap).length)
      }]
    };
  }
  @Input() expenses: any[] = [];
  @Input() tags: string[] = [];
  @Input() categories: string[] = [];
  @Input() filterTag = '';
  @Input() filterCategory = '';
  @Input() filterDateType = 'daily';
  @Input() filterCustomStart = '';
  @Input() filterCustomEnd = '';
  @Input() filterSingleDate = '';
}
