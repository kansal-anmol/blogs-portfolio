import React, { useState, useEffect, useRef } from 'react';
import { TerminalProps } from './types';
import { useTypewriter } from './useTypewriter';
import { useTerminal } from './useTerminal';
import styles from './styles.module.css';

export const Terminal: React.FC<TerminalProps> = ({
  user,
  hostname,
  bootMessage,
  commands,
  prompt,
  className = '',
}) => {
  const [bootComplete, setBootComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const bootText = useTypewriter(bootMessage, 8, () => {
    setBootComplete(true);
  });

  const {
    input,
    setInput,
    logs,
    handleKeyDown,
    executeCommand,
  } = useTerminal(commands);

  // Auto-run "help" command when typewriter boot sequence finishes
  useEffect(() => {
    if (bootComplete) {
      executeCommand('help');
    }
  }, [bootComplete]);

  // Keep terminal scrolled to the absolute bottom on logs or typing updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, bootText, input]);

  // Handle focusing the hidden input on click of the terminal body
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Automatically focus on mount (if boot complete)
  useEffect(() => {
    if (bootComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootComplete]);

  return (
    <div
      ref={containerRef}
      onClick={handleTerminalClick}
      className={`${styles.container} ${className}`}
    >
      {/* Scrollable logs area */}
      <div className={styles.logs}>
        {/* Boot Sequence */}
        <div className={styles.bootMessage}>{bootText}</div>

        {/* History Log Outputs */}
        {bootComplete &&
          logs.map((log) => (
            <div key={log.id} className={styles.logItem}>
              {/* Previous Command Line */}
              <div className={styles.promptLine}>
                <span>
                  {user}@{hostname}:~{prompt}
                </span>{' '}
                <span className={styles.visibleInputText}>{log.command}</span>
              </div>
              {/* Output Content */}
              {log.output && (
                <div className={styles.output}>{log.output}</div>
              )}
            </div>
          ))}
      </div>

      {/* Main Active Prompt Area */}
      {bootComplete && (
        <div className={styles.inputRow}>
          <div className={styles.promptLine}>
            <span>
              {user}@{hostname}:~{prompt}
            </span>
          </div>

          <div className={styles.visibleInputText}>
            <span>{input}</span>
            <span className={styles.cursor}></span>
          </div>

          {/* Hidden input to receive active typing/autocompletion/history triggers */}
          <input
            ref={inputRef}
            type="text"
            className={styles.hiddenInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
};
