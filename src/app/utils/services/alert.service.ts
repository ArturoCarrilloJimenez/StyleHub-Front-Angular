// src/app/services/alert.service.ts
import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

export interface AlertOptions {
  icon: 'error' | 'success' | 'warning' | 'info';
  title: string;
  text?: string;
  url?: { text: string; url: string };
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  alert(options: AlertOptions): Promise<SweetAlertResult<void>> {
    const { icon, title, text, url } = options;

    // Check if the document is in dark mode
    const htmlEl = document.documentElement;
    const isDark =
      htmlEl.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    return Swal.fire({
      icon,
      title,
      text,
      confirmButtonText: 'OK',
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f9fafb' : '#111827',
      footer: url
        ? `<a href="${url.url}" target="_blank">${url.text}</a>`
        : undefined,
    });
  }
}
