export default function AdminCampingInputField({
    label,
    name,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    error = '',
    step,
}) {
    return (
        <label className="flex flex-col gap-2 text-sm font-semibold text-on-surface">
            <span>{label}</span>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                step={step}
                className={`rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors ${
                    error
                        ? 'border-red-200 focus:border-red-300'
                        : 'border-outline-variant/20 focus:border-primary/40'
                }`}
            />
            {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
        </label>
    );
}
