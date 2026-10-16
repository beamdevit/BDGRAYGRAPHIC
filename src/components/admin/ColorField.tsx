'use client'

import { FieldLabel, useField, useForm } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import React from 'react'
import { THEME_COLOR_KEYS, THEME_PRESETS, isHexColor } from '@/lib/site-theme'

export const ColorField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue, showError, errorMessage } = useField<string>({ path })
  const current = typeof value === 'string' ? value : ''
  const pickerValue = isHexColor(current) ? current : '#000000'

  return (
    <div className="field-type" style={{ marginBottom: 20 }}>
      <FieldLabel label={field.label} path={path} required={field.required} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <input
          type="color"
          aria-label={typeof field.label === 'string' ? field.label : path}
          value={pickerValue}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: 56, height: 40, padding: 2, border: '1px solid var(--theme-elevation-150)', borderRadius: 8, background: 'none', cursor: 'pointer' }}
        />
        <input
          type="text"
          value={current}
          maxLength={7}
          spellCheck={false}
          onChange={(e) => setValue(e.target.value.trim())}
          style={{ width: 120, height: 40, padding: '0 10px', fontFamily: 'monospace', border: '1px solid var(--theme-elevation-150)', borderRadius: 8, background: 'var(--theme-input-bg)', color: 'var(--theme-text)' }}
        />
      </div>
      {field.admin?.description ? (
        <div style={{ marginTop: 6, fontSize: 13, color: 'var(--theme-elevation-500)' }}>
          {typeof field.admin.description === 'string' ? field.admin.description : null}
        </div>
      ) : null}
      {showError && errorMessage ? <div style={{ color: 'var(--theme-error-500)', marginTop: 4, fontSize: 13 }}>{errorMessage}</div> : null}
    </div>
  )
}

export const ThemePresets: React.FC = () => {
  const { dispatchFields, setModified } = useForm()

  const apply = (colors: Record<string, string>) => {
    for (const key of THEME_COLOR_KEYS) {
      dispatchFields({ type: 'UPDATE', path: key, value: colors[key], valid: true })
    }
    setModified(true)
  }

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontWeight: 600, marginBottom: 10 }}>ชุดสีสำเร็จรูป</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {THEME_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => apply(preset.colors)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', border: '1px solid var(--theme-elevation-150)', borderRadius: 10, background: 'var(--theme-elevation-0)', color: 'var(--theme-text)', cursor: 'pointer', font: 'inherit' }}
          >
            <span style={{ display: 'inline-flex', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--theme-elevation-150)' }}>
              {[preset.colors.primary, preset.colors.primaryDark, preset.colors.accent, preset.colors.paper].map((c) => (
                <span key={c} style={{ width: 16, height: 22, background: c }} />
              ))}
            </span>
            {preset.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 8, fontSize: 13, color: 'var(--theme-elevation-500)' }}>
        กดเลือกชุดสีแล้วกด “บันทึก” ด้านบนเพื่อใช้งานจริง
      </div>
    </div>
  )
}
